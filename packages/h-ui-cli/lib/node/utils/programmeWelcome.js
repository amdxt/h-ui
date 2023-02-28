import clear from 'clear';
import figlet from 'figlet';
import chalkAnimation from 'chalk-animation';
export async function welcome() {
    return new Promise((resolve, reject) => {
        clear();
        const logo = figlet.textSync('@my-h-ui/h-ui!', {
            // font: "Ghost",
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
        });
        const rainbow = chalkAnimation.rainbow(logo);
        setTimeout(() => {
            rainbow.stop(); // Animation stops
            resolve(true);
        }, 300);
    });
}
export default welcome;
