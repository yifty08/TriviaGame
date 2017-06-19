$("#start").on("click", function() {
    game.start();
})
$(document).on('click', '#end', function() {
    game.done();
})
var questions = [{
    question: "Who headbutted in 2006 World Cup Final?",
    answers: ["Materazzi", "Zidane", "Henry"],
    correctAnswer: "Zidane"
}, {
    question: "Who scored most goals in 2002 World Cup?",
    answers: ["Ronaldo", "Klose", "Henry"],
    correctAnswer: "Ronaldo"
}, {
    question: "Who won the 2012 World Cup?",
    answers: ["England", "Spain", "Germany"],
    correctAnswer: "Germany"
}];

var game = {
    correct: 0,
    incorrect: 0,
    counter: 30,
    countdown: function() {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("Time is up!");
            game.done();
        }
    },
    start: function() {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter">30</span> Seconds</h2>');
        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {

            $("#subwrapper").append("<h2>" + questions[i] + "</h2>");

            for (var j = 0; j < questions[i].answers.length; j++) {

                $("#subwrapper").append("<input type='radio' name='question-" + i + "' value='" + questions[i].answers[j] + "'>" + questions[i].answers[j])

            }

        }
        $('#subwrapper').append('<br><button id="end">Done</button>')

    },
    done: function() {
        $.each($('input[name="question-0"]:checked'), function() {
            if ($(this).val() == questions[0].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        });

        $.each($('input[name="question-1"]:checked'), function() {
            if ($(this).val() == questions[1].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        });

        $.each($('input[name="question-2"]:checked'), function() {
            if ($(this).val() == questions[2].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        });

        this.result();
    },

    result: function() {
        clearInterval(timer);
        $('#subwrapper h2').remove();

        $('#subwrapper').html("<h2>All done!</h2>");
        $('#subwrapper').append("<h3>Correct Answers: " + this.correct + "</h3>");
        $('#subwrapper').append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    }

};
