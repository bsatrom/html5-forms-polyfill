describe('Kendo Forms Widget Test Suite', function() {
  
  describe('Form initialization tests', function() {
		var fixtures = jasmine.getFixtures();

		if (document.location.pathname === '/context.html') {
			// Karma is running the test, so change the base
			fixtures.fixturesPath = 'base/spec/javascripts/fixtures';
		} else if (document.location.pathname.indexOf('runner.html') > 0) {
			// We're running jasmine in the browser
			fixtures.fixturesPath = '../spec/javascripts/fixtures';
		}
		
		describe('Form Widget initialization', function() {
			
			it('should exist in the kendo.ui namespace', function() {
				expect(kendo.ui.Form).toBeDefined();
			});

			it('should be able to perform imperative initialization with JavaScript',
				function() {
				expect($('#imperative-form').kendoForm).toBeDefined();
			});

			it('should be able to perform declarative initialization with data' +
				' attributes', function() {
				fixtures.load('declarative-form.html');

				kendo.init(document.body);

				expect($('#declarative-form').data('kendoForm')).not.toBe(null);
			});

		});
	});
});