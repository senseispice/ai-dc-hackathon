.PHONY: install run dev demo test streamlit fmt lint clean

install:
	python -m pip install -r requirements.txt

run:
	uvicorn app.main:app --reload --port 8000

dev: run

demo:
	python demo.py

test:
	python test_pipeline.py

streamlit:
	streamlit run frontend/streamlit_app.py --server.port 8501

fmt:
	python -m black app/ frontend/ *.py

lint:
	python -m ruff check app/ frontend/ *.py

clean:
	rm -rf __pycache__ app/__pycache__ app/**/__pycache__
	rm -rf chroma_db/ tmp/ .cache/
