# -*- mode: makefile -*-

MKDIR = mkdir -p
TO := _

ifdef BUILD_NUMBER
NUMBER = $(BUILD_NUMBER)
else
NUMBER = 1
endif

ifdef JOB_BASE_NAME
PROJECT_ENCODED_SLASH = $(subst %2F,$(TO),$(JOB_BASE_NAME))
PROJECT = $(subst /,$(TO),$(PROJECT_ENCODED_SLASH))
# Run on CI
COMPOSE = docker-compose -f docker-compose.yml -p remote_logging_$(PROJECT)_$(NUMBER)
else
# Run Locally
COMPOSE = docker-compose -p remote-logging
endif

.PHONY: run
run:
	$(COMPOSE) build remote-logging
	$(COMPOSE) up remote-logging

.PHONY: down
down:
	$(COMPOSE) down --volumes
