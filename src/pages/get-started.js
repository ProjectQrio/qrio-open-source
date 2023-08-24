import MainNavigation from "../../MainNavigation.js";
import Footer from "@/components/Footer.js";



export default function GetStartedPage () {

return (
    <div>

    <MainNavigation />

    <h1>Welcome to Project Qrio!</h1>
    <h3>This is an Early Test</h3>
    <p>First off, please note that this is an early test version of the app. We still have a ton of functionality we plan to add. It only works on desktop, and is not very pretty.
    The purpose of this early version is to get feedback on the core functionality of the app. We want to know if it is useful, and if it is easy to use. We also want to know what features you would like to see added.
    </p>
    <h3>The Purpose of Project Qrio</h3>
    <img src="https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fepuqhwqxkx331.jpg%3Fauto%3Dwebp%26s%3Dde0658f9652f993a5f4e5cbd30d28ad44372cec1" alt="Shit You Don't Know You Don't Know" />
    <p>
        Project Qrio is based on the premise that everyone is inherently biased, and none of us know what we don't know. So that means we have to work together 
    </p>

    <Footer />
    </div>

);
}

