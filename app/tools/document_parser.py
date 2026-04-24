"""Utilities for parsing PDF and DOCX documents into plain text."""

from __future__ import annotations


def parse_pdf(file_path: str) -> str:
    """Extract all text from a PDF file."""
    raise NotImplementedError


def parse_docx(file_path: str) -> str:
    """Extract all text from a DOCX file."""
    raise NotImplementedError


def parse_document(file_path: str) -> str:
    """Auto-detect format (.pdf, .docx, .txt) and return extracted text."""
    raise NotImplementedError


def chunk_text(text: str, chunk_size: int = 2000, overlap: int = 200) -> list[str]:
    """Split text into overlapping chunks for LLM processing."""
    raise NotImplementedError
