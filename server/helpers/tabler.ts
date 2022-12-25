type TablerConfig = { padding: number, colors: string[], header: string, background: string, border: string };

class Tabler {

    private config: TablerConfig

    private defaultConfig: TablerConfig = {
        padding: 3,
        colors: ['\x1b[1m'],
        header: '\x1b[1m',
        background: '\x1b[0m',
        border: '\x1b[1m'
    };

    constructor(config: Partial<TablerConfig>) {
        this.config = ((config === undefined) ? this.defaultConfig : { ...this.defaultConfig, ...config });
    }

    public buildTable(data: object[], headers: string[] = []) {
        try {

            let widths = this.getMinWidth(data, headers);
            let rows: string[] = [];

            rows.push(this.buildTop(widths, this.config.padding));
    
            if (headers.length > 0) {
                rows.push(this.buildHeaders(headers, widths, this.config.padding));
                rows.push(this.buildDivider(widths));
            }
    
            data.forEach((item, index) => {
                rows.push(this.buildMiddle(item, widths));
                if (index !== data.length - 1) rows.push(this.buildDivider(widths));
            });
    
            rows.push(this.buildBottom(widths, this.config.padding));
    
            console.log(rows.join("\n"));
        } catch (error) {
            console.table(data);

            this.config.colors = ['\x1b[37m']
            this.config.header = '\x1b[37m'
            this.config.background = '\x1b[41m'
            this.buildTable([{ error: "THERE WAS AN ERROR BUILDING THE TABLE" }], ["ERROR"]);

            console.log(error);
        }
    }

    private buildHeaders(headers: string[], width: number[], padding: number = 3) {

        let start = this.config.background == '\x1b[0m' ? '│' : '█';
        let color = this.config.background == '\x1b[0m' ? this.config.border : this.bgTofg(this.config.background);

        let header = "\x1b[0m" + color + start + "\x1b[0m";

        headers.forEach((head, index) => {
            
            // Same as buildMiddle but text is centered
            const totalWidth = width[index] + (padding * 2);
            
            const leftPadding = Math.floor((totalWidth - head.length) / 2);
            const rightPadding = totalWidth - head.length - leftPadding;

            header += this.config.background + " ".repeat(leftPadding);
            header += this.config.background + (this.config.header || '\x1b[1m') + head.toString();
            header += this.config.background + " ".repeat(rightPadding);
            header += "\x1b[0m" + color + start + "\x1b[0m";
        });

        return header;
    }

    private buildTop(widths: number[], padding: number = 3) {

        let isBG = this.config.background == '\x1b[0m' ? true : false;

        let start = isBG ? '┌' : '█';
        let spacer = isBG ? '─' : '█';
        let divide = isBG ? '┬' : '█';
        let end = isBG ? '┐' : '█';

        let color = isBG ? this.config.border : this.bgTofg(this.config.background);

        let top = "\x1b[0m" + color + start;
        
        widths.forEach((width) => {
            top += spacer.repeat(width + padding * 2);
            top += divide;
        });

        top = top.slice(0, -1);
        top += end;

        return top + "\x1b[0m";
    }

    private buildMiddle(data: object, widths: number[], padding: number = 3) {

        let isBG = this.config.background == '\x1b[0m' ? true : false;

        let start = isBG ? '│' : '█';

        let color = isBG ? this.config.border : this.bgTofg(this.config.background);

        let middle = "\x1b[0m" + color + start + "\x1b[0m";

        Object.values(data).forEach((value, index) => {
            const totalWidth = widths[index] + (padding * 2);

            const leftPadding = Math.floor((totalWidth - value.toString().length) / 2);
            const rightPadding = totalWidth - value.toString().length - leftPadding;

            middle += this.config.background + " ".repeat(leftPadding);
            middle += this.config.background + (this.config.colors[index] || '\x1b[1m') + value.toString();
            middle += this.config.background + " ".repeat(rightPadding);
            middle += "\x1b[0m" + color + start + "\x1b[0m";
        });

        return middle;
    }

    private buildDivider(widths: number[], padding: number = 3) {

        let isBG = this.config.background == '\x1b[0m' ? true : false;

        let start = isBG ? '├' : '█';
        let spacer = isBG ? '─' : '█';
        let divide = isBG ? '┼' : '█';
        let end = isBG ? '┤' : '█';

        let color = this.config.background == '\x1b[0m' ? this.config.border : this.bgTofg(this.config.background);

        let divider = "\x1b[0m" + color + start;

        widths.forEach((width) => {
            divider += spacer.repeat(width + padding * 2);
            divider += divide;
        });

        divider = divider.slice(0, -1);
        divider += end;

        return divider + "\x1b[0m";
    }

    private buildBottom(widths: number[], padding: number = 3) {

        let isBG = this.config.background == '\x1b[0m' ? true : false;

        let start = isBG ? '└' : '█';
        let spacer = isBG ? '─' : '█';
        let divide = isBG ? '┴' : '█';
        let end = isBG ? '┘' : '█';

        let color = this.config.background == '\x1b[0m' ? this.config.border : this.bgTofg(this.config.background);

        let bottom = "\x1b[0m" + color + start;

        widths.forEach((width) => {
            bottom += spacer.repeat(width + padding * 2);
            bottom += divide;
        });

        bottom = bottom.slice(0, -1);
        bottom += end;

        return bottom + "\x1b[0m";
    }

    // Get second to last two characters parse to int add 10 to it put it back together and return
    private bgTofg(color: string) {

        let colorBase = color.slice(0, -1);
        let colorCode = parseInt(colorBase.slice(-2));

        colorCode -= 10;

        return '\x1b[' + colorCode + "m";

    }

    private objLength(data: object): number {
        let stringLength = 0;

        Object.values(data).forEach((value) => {
            stringLength += value.toString().length;
        });

        return stringLength;
    }

    private getLongestObject(data: object[]): number {
        let longestString = 0;
        let longestObject = 0;

        data.forEach((item, index) => {
            const length = this.objLength(item);
            if (length > longestString) {
                longestObject = index;
            }
        });

        return longestObject;
    }

    private objectWidths(data: object): number[] {
        let widths: number[] = [];

        Object.values(data).forEach((value) => {
            widths.push(value.toString().length);
        });

        return widths;
    }

    private arrayWidths(data: string[]): number[] {
        let widths: number[] = [];

        data.forEach((value) => {
            widths.push(value.toString().length);
        });

        return widths;
    }

    private getMinWidth(data: object[], headers: string[]): number[] {

        let obj = data[this.getLongestObject(data)];
        let widths: number[] = [];

        let objWidths: number[] = this.objectWidths(obj);
        let headerWidths: number[] = this.arrayWidths(headers);

        objWidths.forEach((width, index) => {
            widths.push(Math.max(width, headerWidths[index] || 0));
        });

        return widths;
    }
}

export default Tabler;