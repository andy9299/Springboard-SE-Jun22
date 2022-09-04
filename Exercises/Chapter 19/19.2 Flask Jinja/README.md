# Further Study
## Use Template Inheritance
Make a base.html template of common parts of your templates (like the <html>, <body>, and other common things, and change your templates so they inherit from this base template.

## Allow User to Pick Story
Add a feature where there are several different story templates, rather than just one.

The homepage should change to a drop-down menu of the story templates. When the user picks a template, it should go to the page that prompts for the list of story questions. That should, as before, go to the page that shows the generated story.

# Add CSS
Still want more? Add some CSS to your madlibs, storing the CSS file in a static/ directory and referencing it properly, so Flask will serve it up.

## Additional Further Study
What? More time? Add some JS to your madlibs – perhaps you can validate the form (make sure every question is answered, all answers are at least 3 characters long, all lowercase, etc) before you’re allowed to submit the form.

Even more, you say??? Try to add a page to your application where uses can create their own madlibs, by providing a list of parts of speech, along with the text of the story. Submitting this form should create a new story instance that you could then select from the dropdown of stories.

Note: This will be challenging given what you know now! Consider it a super bonus. Also, because we don’t yet know how to persist data, if you store you stories on the server in a list, that list will get reset every time you restart your server.