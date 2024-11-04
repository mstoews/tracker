## up: starts all containers in the background without forcing build
build:
	@echo "Building site..."
	npm run build
	@echo "Finished started!"


start:
	@echo "Running site..."
	npm run dev
	@echo "Finished started!"
