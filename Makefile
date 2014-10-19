.PHONY: lint test

default: lint test

lint:
	find lib test -name "*.js" | xargs node_modules/jshint/bin/jshint

test: lint
	node_modules/mocha/bin/mocha --reporter=spec --ui tdd
