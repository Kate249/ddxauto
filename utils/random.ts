export function getRandomPhoneNumber(): string {
    return `+7901${new Date().getTime().toString().substring(6)}`
};

export function getRandomEmail(): string {
    return `autotest+${new Date().getTime().toString()}@mailtest.ru`
};

export function getRandomTestName(length = 15) {
    const prefixStr = 2;
    const randomStr = Math.random().toString(36).substring(prefixStr, prefixStr + length);
    const resultStr = `TestName-${randomStr}`;
    
    return resultStr;
};