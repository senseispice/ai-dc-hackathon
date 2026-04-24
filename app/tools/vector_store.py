"""ChromaDB vector store for historical PWS/SOW retrieval."""

from __future__ import annotations


class RestorationVectorStore:
    """Thin wrapper around a ChromaDB collection for restoration documents."""

    COLLECTION_NAME = "restoration_docs"

    def __init__(self) -> None:
        raise NotImplementedError

    def add_documents(
        self,
        texts: list[str],
        metadatas: list[dict] | None = None,
        ids: list[str] | None = None,
    ) -> None:
        """Add text chunks to the collection."""
        raise NotImplementedError

    def query(self, query_text: str, n_results: int = 5) -> list[dict]:
        """Retrieve the most relevant documents for a query."""
        raise NotImplementedError
