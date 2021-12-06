export default (
    input: string,
    separator: string = ',',
    quote: string = '"'
) : string[][] => {
    const lines = parseLines(input, quote);

    return parseValues(lines, separator, quote);
}

const parseLines = (
    input: string,
    quote: string,
) => {
    let lines = [];
    let inQuote = false;
    let lastNL = 0;

    for(let i = 0; i < input.length; i++) {
        if (input[i] === quote) {
            inQuote = !inQuote;
        } else if (input.slice(i, i + 1) === '\n' && !inQuote) {
                lines.push(input.substr(lastNL, i));
                lastNL = i+1;
                i++;
        }
    }

    input.substr(lastNL) && lines.push(input.substr(lastNL));

    return lines;
}

const parseValues = (
    lines: string[],
    separator: string,
    quote: string
): string[][] => {
    return lines.map(line => {
        const values = [];
        let inQuote = false;
        let currentValue = '';

        for(let i = 0; i < line.length; i++) {
            if (line.substr(i, quote.length) === quote) {
                inQuote = !inQuote;
                currentValue += line[i];
            } else if (!inQuote && line.substr(i, separator.length) === separator) {
                values.push(currentValue);
                i += separator.length - 1;
                currentValue = '';
            } else {
                currentValue += line[i];
            }
        }

        currentValue && values.push(currentValue);
        return values;
    })
}