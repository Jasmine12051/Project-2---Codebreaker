var P2 = (function () {

    const codeLength = 4;

    var isGameOver = false, isFirstrow = true;
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

    var createSecretCode = function(){
        code = [];
        var codeMessage = "";

        for(let i = 0; i < codeLength; i++){
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

    var buildTableHeader = function(){
        var output_table = document.createElement("table");
        var tableBody = document.createElement("tbody");

        var header_row = document.createElement("tr");

        var column1  = document.createElement("th");
        column1.setAttribute("style", "rowspan: 2"); 
        column1.innerHTML = ("Row #");
        var column2 = document.createElement("th");
        column2.setAttribute("style", "colspan: 4"); 
        column2.innerHTML = ("Code Pegs");
        var column3 = document.createElement("th");
        column3.setAttribute("style", "rowspan: 2"); 
        column3.innerHTML = ("Key Pegs");

        header_row.appendChild(column1);
        header_row.appendChild(column2);
        header_row.appendChild(column3);

        tableBody.appendChild(header_row);
        output_table.appendChild(tableBody);

        $("#output").html(output_table);


        
    };

    var buildTableRow = function(){

    };

    var isGuessValid = function() {
        var valid = true; 

    };

    var checkGuess = function() {

    }


    return {

        start: function () {
            buildPegSelectors();
            createSecretCode();
            buildTableHeader();

        }

    };

})();
