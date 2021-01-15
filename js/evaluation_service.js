API = 'http://3.131.4.23:5001/'
OWNER_EVALUATION = 'me_evaluation'
var evaluation = {};










// <div id="box"></div>
// createCheckBox('box');
async function createCheckBox(containerId) {
    var container = document.getElementById(containerId);
    var spinner = createSpinner();
    container.appendChild(spinner);
    var htmlElement = document.querySelector("html");
    htmlElement.style = "cursor: progress;";

    await getEvaluationById(1).then((resp) => {
        evaluation = resp.data;
        //console.log(evaluation);
    });

    await setTimeout(function() {

        //Curser anpassen

        container.removeChild(spinner);
        htmlElement.style = "cursor: auto;";


        var index = 0;
        for (let question of evaluation.properties.parts) {
            if (question.type == "MULTIPLE CHOICE") {
                question = new Question(question.header, question.body, question.options, question.type, question.points, question.correct_answer, index).getHTML();
                container.append(question);
            }
            index += 1;
        }
    }, 1500);
}

function getEvaluationById(id) {
    return new Promise((resolve, reject) => {
        $.post(API + 'get?owner=' + OWNER_EVALUATION + '&key=' + id, function(resp) {
            resolve(resp)
        });
    })
}

function createSpinner() {
    var container = document.createElement("DIV");
    container.className = "text-center";
    var spinner = document.createElement("DIV");
    spinner.className = "spinner-border text-light";
    spinner.style = "width: 5rem; height: 5rem; margin-top: 15px;";
    container.appendChild(spinner);
    return container;
}

class Question {
    constructor(title, description, options, type, points, correctAnswer, question_id) {
        this.title = title;
        this.description = description;
        this.options = options;
        this.type = type;
        this.points = points;
        this.correctAnswer = correctAnswer;
        this.question_id = question_id;
        this.question = this._createQuestion();
    }

    getHTML() {
        return this.question;
    }

    _createQuestion() {
        var container = document.createElement("DIV");
        container.className = "card";
        container.setAttribute("questionId", this.question_id);
        var cardBody = document.createElement("DIV");
        cardBody.className = "card-body";
        cardBody.appendChild(this._createTitle());
        cardBody.appendChild(this._createDescription());
        cardBody.append(this._createButtonGroup());
        container.append(cardBody);
        return container;
    }

    _createTitle() {
        var title = document.createElement("H5");
        title.className = "card-title";
        title.innerHTML = this.title;
        return title;
    }

    _createDescription() {
        var description = document.createElement("P");
        description.className = "card-text";
        description.innerHTML = this.description;
        return description;
    }

    _createButtonGroup() {
        var container = document.createElement("DIV");
        container.appendChild(new answerRadioFields(this.options).getHTML());
        return container;
    }
}

class answerRadioFields {
    constructor(options, correctAnswer) {
        this.options = options
        this.correctAnswer = correctAnswer
        this.form = this._createForm();
    }

    getHTML() {
        return this.form
    }

    _createForm() {
        var form = document.createElement("FORM");
        form.onsubmit = this._checkAnswer;

        var index = 0;
        for (let option of this.options) {
            index += 1;
            var container = document.createElement("DIV")
            container.className = "form-check";
            container.appendChild(this._createRadioButton(option, index));
            container.appendChild(this._createLabel(option));
            form.appendChild(container)
                // form.appendChild(document.createElement("BR"));
        }
        var submit = document.createElement("BUTTON");
        submit.onclick = this._checkAnswer;
        submit.type = "BUTTON";
        submit.className = "btn btn-primary ";
        submit.innerHTML = "Abschicken";
        form.appendChild(submit);

        return form;
    }

    _createLabel(text) {
        var label = document.createElement("LABEL");
        label.className = "form-check-label";
        var text = document.createTextNode(text);
        label.appendChild(text);
        return label;
    }

    _createRadioButton(text, id) {
        var radio = document.createElement("INPUT");
        radio.type = "radio";
        radio.name = "0";
        radio.className = "form-check-input";
        // radio.style = "margin-right: 30px;"
        radio.setAttribute("answerid", id);
        radio.value = text;
        return radio
    }

    _checkAnswer(resp) {
        const selected = resp.path[1].querySelector("input:checked");
        console.log(resp);

        if (selected) {
            // get question
            const questionId = resp.path[4].attributes.questionId;
            const question = evaluation.properties.parts[questionId.value];

            // disable radio buttons
            for (let element of resp.path[1].elements) {
                element.disabled = true;
            }

            // remove submit button
            resp.path[1].removeChild(resp.path[0]);
            resp.path[4].style.color = "black";
            // check answer
            if (question.correct_answer == selected.attributes.answerid.value) {
                resp.path[4].style.backgroundColor = "rgb(144,238,144)";

                console.log("Correct answer");
            } else if (question.correct_answer == "True" | question.correct_answer == "true") {
                resp.path[4].style.backgroundColor = "rgb(211,211,211)";
            } else {
                resp.path[4].style.backgroundColor = "rgb(250,128,114)";
                console.log("Wrong answer");
            }
        } else {
            //TODO: Raise alert
        }
    }
}

//Yes or no:
// var isTrue = (question.correct_answer == 'True' || question.correct_answer == 'true');