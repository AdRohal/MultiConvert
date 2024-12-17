from flask import Flask, request, send_file, jsonify
from werkzeug.utils import secure_filename
from io import BytesIO
import os
import logging
import fitz  # PyMuPDF
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.section import WD_ORIENTATION
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import tempfile  # Import tempfile module
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Directory to save converted files
CONVERTED_FOLDER = os.path.join(os.path.dirname(__file__), 'converted_files')
os.makedirs(CONVERTED_FOLDER, exist_ok=True)

@app.route('/convert', methods=['POST'])
def convert_file():
    try:
        if 'file' not in request.files:
            app.logger.error("No file part in the request")
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        format = request.form.get('format', 'docx')

        if file.filename == '':
            app.logger.error("No selected file")
            return jsonify({"error": "No selected file"}), 400

        filename = secure_filename(file.filename)
        file_ext = filename.rsplit('.', 1)[1].lower()

        if file_ext == 'pdf' and format == 'docx':
            # Convert PDF to DOCX by rendering each page as an image
            pdf_file = BytesIO(file.read())
            pdf_document = fitz.open(stream=pdf_file, filetype="pdf")
            docx_document = Document()

            for page_num in range(len(pdf_document)):
                page = pdf_document.load_page(page_num)
                pix = page.get_pixmap()

                # Save page as an image
                with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_img:
                    temp_img.write(pix.tobytes())
                    temp_img_path = temp_img.name

                # Set page size to match PDF page size
                pdf_width, pdf_height = page.rect.width, page.rect.height
                section = docx_document.sections[-1]
                section.orientation = WD_ORIENTATION.PORTRAIT
                section.page_width = Pt(pdf_width)
                section.page_height = Pt(pdf_height)
                section.left_margin = Inches(0)
                section.right_margin = Inches(0)
                section.top_margin = Inches(0)
                section.bottom_margin = Inches(0)

                # Add image to DOCX
                docx_document.add_picture(temp_img_path, width=section.page_width, height=section.page_height)
                os.remove(temp_img_path)

                # Add a page break after each page except the last one
                if page_num < len(pdf_document) - 1:
                    docx_document.add_section(WD_ORIENTATION.PORTRAIT)

            # Save the DOCX file to the designated directory
            converted_filename = f"{filename.rsplit('.', 1)[0]}.docx"
            converted_file_path = os.path.join(CONVERTED_FOLDER, converted_filename)
            docx_document.save(converted_file_path)

            app.logger.info(f"Successfully converted {filename} to DOCX")
            return jsonify({"filename": converted_filename})
        
        elif file_ext == 'docx' and format == 'pdf':
            # Convert DOCX to PDF
            docx_file = BytesIO(file.read())
            document = Document(docx_file)
            pdf_filename = f"{filename.rsplit('.', 1)[0]}.pdf"
            pdf_file_path = os.path.join(CONVERTED_FOLDER, pdf_filename)

            c = canvas.Canvas(pdf_file_path, pagesize=letter)
            width, height = letter

            for paragraph in document.paragraphs:
                text = paragraph.text
                c.drawString(100, height - 100, text)
                height -= 20  # Adjust line height

            c.save()

            app.logger.info(f"Successfully converted {filename} to PDF")
            return jsonify({"filename": pdf_filename})
        
        else:
            app.logger.error("Unsupported file format or conversion")
            return jsonify({"error": "Unsupported file format or conversion"}), 400
    except Exception as e:
        app.logger.error(f"Error during file conversion: {e}")
        return jsonify({"error": f"An error occurred during file conversion: {e}"}), 500

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(CONVERTED_FOLDER, filename)
    app.logger.debug(f"Attempting to download file from path: {file_path}")
    if os.path.exists(file_path):
        app.logger.info(f"File found: {file_path}")
        return send_file(file_path, as_attachment=True, download_name=filename)
    else:
        app.logger.error(f"File not found: {file_path}")
        return jsonify({"error": "File not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)