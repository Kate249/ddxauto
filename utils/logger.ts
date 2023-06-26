type LogTitle = 'response body' | 'response status' | 'request url' | 'request body' | 'request parameters'

export function log(title: LogTitle, body: any = "" ): void {
    console.log(`\n\t--${title.toUpperCase()}--`);
    console.log(body);
}