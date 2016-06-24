// Example
$.getJSON("https://raw.githubusercontent.com/rrbaker/maker.json/gh-pages/schemas/maker-v1.json", function(json) {
    $("#example_json").append(JSON.stringify(json, null, "  "));
});

// Builder
$.getJSON("https://raw.githubusercontent.com/rrbaker/maker.json/gh-pages/schemas/maker-v1.json", function(json) {
    $("#form").alpaca({
        "schema": json,
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "title": "Render maker.json",
                        "styles": "btn btn-primary",
                        "click": function() {
                            var val = this.getValue();
                            if (this.isValid(true)) {
                                $("#results").text('');
                                var results = JSON.stringify(val, null, "  ");
                                $("#results").append(results);
                                $("#download").removeAttr('disabled');
                                $("#download_link").attr({
                                    'href': 'data:text/json;charset=utf-8,' + encodeURIComponent(results),
                                    'target': '_blank',
                                    'download': 'maker.json'
                                });
                            }
                        }
                    }
                }
            }
        }
    });
});

// Validator
$.getJSON("https://raw.githubusercontent.com/rrbaker/maker.json/gh-pages/schemas/maker-v1.json", function(schema) {
    $("#validate").click(function() {
        try {
            var civic = JSON.parse($("#to_validate").val());
            var valid = tv4.validateMultiple(civic, schema);
            console.log(valid);
            if (valid.valid === true) {
                $("#validate_result").text("Your maker.json is valid :)");
            } else {
                $("#validate_result").text("Your maker.json is broken :(");
                var errors = valid.errors;
                for (i = 0; i < valid.errors.length; i++) {
                    $("#validate_result").append('<br>' + valid.errors[i].dataPath + ': ' + valid.errors[i].message);
                }
            }
        } catch (err) {
            $("#validate_result").addClass("callout alert").text("Sorry, looks like your maker.json is invalid.");
        }
    });
});
