const head = document.head;

function createIcon(href) {

    if (href == 'default') {
        href = '/ios-app-kit/icon/default-icon.jpg';
        console.log('No icon attribute was found inside the ios-app tag. Default icon was applied.');
    }

    const newLinkTag = document.createElement('link');

    newLinkTag.rel = 'icon';

    newLinkTag.href = href;

    head.appendChild(newLinkTag);

}

async function loadApplication() {

    const iosAppTag = document.getElementsByTagName('ios-app')[0];

    if (iosAppTag) {
        const newMetaTag = document.createElement('meta');

        newMetaTag.name = 'apple-mobile-web-app-capable';
        newMetaTag.content = 'yes';

        head.appendChild(newMetaTag);

        if (iosAppTag.getAttribute('name') && document.getElementsByTagName('title').length === 0) {
            const newTitleTag = document.createElement('title');

            newTitleTag.textContent = iosAppTag.getAttribute('name');

            head.appendChild(newTitleTag);

            console.log('No title tag was found in the document, created one automatically.');
        }

        if (!iosAppTag.getAttribute('icon')) {
            if (!document.getElementsByTagName('link').length === 0) {
                createIcon('default');
            } else {
                let isIconPresent = false;

                const links = document.getElementsByTagName('link');

                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel === 'icon') {
                        isIconPresent = true;
                        break;
                    }
                }

                if (!isIconPresent) {
                    createIcon('default');
                }
            }
        } else {
            createIcon(iosAppTag.getAttribute('icon'));
        }

        if (iosAppTag.getAttribute('status-bar') == 'hidden') {
            const backgroundColor = getComputedStyle(document.body).backgroundColor;

            await wait(100);
            document.body.style.backgroundColor = '#000';
            await wait(100);

            document.body.style.backgroundColor = backgroundColor;
        }
    } else {
        console.warn('ios-app tag is required in the head of the HTML document.')
    }
}

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

document.addEventListener('DOMContentLoaded', async function () {
    loadApplication();
});