var P2 = (function () {

    const codeLength = 4;

    var isGameOver = false, isFirstRow = true;
    var code = null;
    var guesses = 0;

    const codePegs = [
        { name: "Green", color: "\u{1F7E2}" },
        { name: "Blue", color: "\u{1F535}" },
        { name: "Red", color: "\u{1F534}" },
        { name: "Yellow", color: "\u{1F7E1}" },
        { name: "Brown", color: "\u{1F7E4}" },
        { name: "Orange", color: "\u{1F7E0}" }
    ];

    const keyPegBlack = { name: "Black", color: "\u{26AB}" };
    const keyPegWhite = { name: "White", color: "\u{26AA}" };

    var createSecretCode = function () {
        code = [];
        var codeMessage = "";
        for (let i = 0; i < codeLength; i++) {
            var index = Math.floor(Math.random() * codePegs.length);
            secretCode = codePegs[index];
            code.push(secretCode);
            codeMessage += (code[i]["name"] + " ");
        }
        console.log("Secret Code: " + codeMessage);
    };

    var buildPegSelectors = function () {

        for (let i = 0; i < codeLength; ++i) {

            var pegSelectColumn = document.createElement("td");

            var pegSelect = document.createElement("select");
            $(pegSelect).attr("id", "slot" + i);

            $(pegSelect).append($("<option>", {
                value: -1,
                selected: "selected",
                text: "(select a color)"
            }));

            for (var p in codePegs) {

                var peg = codePegs[p];

                $(pegSelect).append($("<option>", {
                    value: p,
                    text: peg["color"] + " (" + peg["name"] + ")"
                }));

            }

            $(pegSelectColumn).append(pegSelect);
            $("#pegslots").append(pegSelectColumn);

        }

    };

    var buildTableHeader = function () {
        var output_table = document.createElement("table");
        var tableBody = document.createElement("tbody");
        tableBody.id = "tbody";

        var header_row = document.createElement("tr");
        var keys = ["Row #", "Code Pegs", "Key Pegs"];

        for (var index in keys) {
            var header_col = document.createElement("th");
            header_col.innerHTML = keys[index];
            if (index == 0 || index == 2) {
                header_col.rowSpan = 2;
            }
            else {
                header_col.colSpan = 4;
            }

            header_row.appendChild(header_col);
            tableBody.appendChild(header_row);
        }

        var numberHeader = document.createElement("tr");
        numberHeader.id = "lastheaderrow";
        var numberKeys = ["1", "2", "3", "4"];

        for (index in numberKeys) {
            var number_col = document.createElement("th");
            number_col.innerHTML = numberKeys[index];
            numberHeader.appendChild(number_col);
            tableBody.appendChild(numberHeader);
        }


        output_table.appendChild(tableBody);
        $("#output").html(output_table);




    };

    var buildTableRow = function (result) {

        if (isFirstRow) {
            buildTableHeader();
            isFirstRow = false;
        }

        var guess = result["guess"];
        var keys = result["keys"];
        isGameOver = result["gameover"];

        var guessRows = document.createElement("tr");
        var rowNum = document.createElement("td");
        rowNum.innerHTML = guesses;
        guessRows.appendChild(rowNum);

        for (let i = 0; i < codeLength; i++) {

            var pegsOutput = document.createElement("td");
            pegsOutput.innerHTML = guess[i].color;
            guessRows.appendChild(pegsOutput);

        }

        var keyPegOutput = document.createElement("td");

        for (let i = 0; i < keys.length; i++) {
            keyPegOutput.innerHTML += keys[i];
        }

        guessRows.appendChild(keyPegOutput);

        if (isGameOver) {
            var messageOutput = document.createElement("td");
            messageOutput.innerHTML += " Congratulations!  You guessed the code in only " + guesses + " guess(es)!";
            guessRows.appendChild(messageOutput);
        }

        $("#lastheaderrow").after(guessRows);

    };



    var isGuessValid = function () {
        var valid = true;

        for (let i = 0; i < codeLength; i++) {
            var slotValue = $("#slot" + i).val();

            if (slotValue == -1) {
                valid = false;
            }
        }

        if (!valid) {

            alert("Please make a selection for all 4 boxes!")
        }

        return valid;

    };

    var checkGuess = function () {
        var scratchCode = [];
        var playerGuess = [];
        var scratchGuess = [];
        var key = [];
        var result = {};
        var numCorrect = 0;
        var numMisplaced = 0;

        scratchCode = scratchCode.concat(code);
        var playerGuess = [];
        for (let i = 0; i < codeLength; i++) {

            playerGuess.push(codePegs[$("#slot" + i).val()]);
        }

        scratchGuess = scratchGuess.concat(playerGuess);

        for (let i = 0; i < codeLength; i++) {
            if (scratchGuess[i] == scratchCode[i]) {
                numCorrect++;
                key.push(keyPegBlack.color);
                scratchCode[i] = "X";
                scratchGuess[i] = "Y";
            }
        }

        for (let i = 0; i < codeLength; i++) {
            for (let j = 0; j < codeLength; j++) {
                if (scratchGuess[i] == scratchCode[j]) {
                    numMisplaced++;
                    key.push(keyPegWhite.color);
                    scratchCode[j] = "X";
                    scratchGuess[i] = "Y";

                }
            }
        }

        if (numCorrect == codeLength) {
            isGameOver = true;
        }

        result["keys"] = key;
        result["guess"] = playerGuess;
        result["gameover"] = isGameOver;

        console.log(JSON.stringify(result));

        return result;
    }


    return {

        guess: function () {
            if (!isGameOver) {
                if (isGuessValid()) {
                    guesses++;
                    var result = checkGuess();
                    buildTableRow(result);
                }
            }
        },

        start: function () {
            buildPegSelectors();
            createSecretCode();
        }

    };

})();
