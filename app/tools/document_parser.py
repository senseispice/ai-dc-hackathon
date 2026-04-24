"""Utilities for parsing PDF and DOCX documents into plain text."""

from __future__ import annotations

import pathlib


def parse_pdf(file_path: str) -> str:
    """Extract all text from a PDF file using PyMuPDF."""
    import fitz

    doc = fitz.open(file_path)
    pages = [page.get_text() for page in doc]
    doc.close()
    return "\n".join(pages)


def parse_docx(file_path: str) -> str:
    """Extract all text from a DOCX file."""
    from docx import Document

    doc = Document(file_path)
    return "\n".join(para.text for para in doc.paragraphs)


def parse_document(file_path: str) -> str:
    """Auto-detect format (.pdf, .docx, .txt) and return extracted text."""
    path = pathlib.Path(file_path)
    ext = path.suffix.lower()

    if ext == ".pdf":
        return parse_pdf(file_path)
    elif ext == ".docx":
        return parse_docx(file_path)
    elif ext == ".txt":
        return path.read_text(encoding="utf-8")
    else:
        raise ValueError(f"Unsupported file type: {ext!r}")


def chunk_text(text: str, chunk_size: int = 2000, overlap: int = 200) -> list[str]:
    """Split text into overlapping token-based chunks for LLM processing.

    chunk_size and overlap are measured in tokens (cl100k_base encoding).
    """
    import tiktoken

    enc = tiktoken.get_encoding("cl100k_base")
    tokens = enc.encode(text)

    chunks: list[str] = []
    start = 0
    while start < len(tokens):
        end = min(start + chunk_size, len(tokens))
        chunks.append(enc.decode(tokens[start:end]))
        if end == len(tokens):
            break
        start += chunk_size - overlap

    return chunks
