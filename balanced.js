function balancedOrNot(expressions, maxReplacements) {
    let evalExpressions = [];
    for (let indexExpression in expressions) {
        let fragment = expressions[indexExpression].toString().replace(new RegExp("<>", 'g'), '');
        fragment = Array.from(fragment);
        let intents = maxReplacements[indexExpression];
        let status = 1;
        for (let index in fragment) {
            let iterExpression = fragment[index];
            if (status === 1) {
                if (Number(index) === 0) {
                    if (iterExpression === "<") {
                        if (fragment[(Number(index) + 1)] !== ">") {
                            status = 0;
                            break;
                        }
                    } else {
                        if (intents > 0) {
                            intents -= 1;
                        } else {
                            status = 0;
                            break;
                        }
                    }
                } else if ((Number(index) + 1) === fragment.length) {
                    if (iterExpression === "<") {
                        status = 0;
                        break;
                    } else {
                        if (intents > 0) {
                            intents -= 1;
                        } else {
                            status = 0;
                            break;
                        }
                    }
                } else {
                    switch (iterExpression) {
                        case "<":
                            if (fragment[(Number(index) + 1)] === "<") {
                                status = 0;
                                break;
                            }
                            break;
                        case ">":
                            if (fragment[(Number(index) - 1)] !== "<") {
                                if (intents > 0) {
                                    intents -= 1;
                                } else {
                                    status = 0;
                                    break;
                                }
                            }
                            break;
                    }
                }
            } else {
                break;
            }
        }
        evalExpressions.push(status);
    }
    return evalExpressions;
}