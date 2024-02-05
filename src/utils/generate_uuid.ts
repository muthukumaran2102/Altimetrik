export const generate_uuidv4 = () => {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        (c) => {
            let rnd = Math.random() * 16;//random number in range 0 to 16
            rnd = (dt + rnd) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? rnd : (rnd & 0x3 | 0x8)).toString(16);
        });
}