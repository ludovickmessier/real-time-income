const head = document.head;
const iOSAppTag = document.getElementsByTagName("ios-app")[0];

function ApplyIcon() {
    const NewLinkTag = document.createElement("link");
    NewLinkTag.rel = "shortcut icon";

    if (iOSAppTag.getAttribute("icon")) {
        NewLinkTag.href = iOSAppTag.getAttribute("icon");
    } else {
        NewLinkTag.href = "/ios-app-kit/icon/default-icon.jpg";
    }

    head.appendChild(NewLinkTag);
}

async function LoadApplication() {
    if (iOSAppTag) {
        const NewMetaTag = document.createElement("meta");

        NewMetaTag.name = "apple-mobile-web-app-capable";
        NewMetaTag.content = "yes";

        head.appendChild(NewMetaTag);

        const backgroundColor = getComputedStyle(document.body).backgroundColor;

        await wait(100);
        document.body.style.backgroundColor = "#000";
        await wait(100);

        document.body.style.backgroundColor = backgroundColor;
    } else {
        console.log("ios-app-kit is installed, but not used anywhere. Did you forget to configure it?");
    }
}

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

document.addEventListener('DOMContentLoaded', async function () {
    LoadApplication();
});