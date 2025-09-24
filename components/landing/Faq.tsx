import { TextAnimate } from "../ui/text-animate";

const Faq = () => {
  return (
    <div className="font-mono flex flex-col gap-8 items-center md:py-8">
      <div className="text-center">
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-sm  text-orange-500"
        >
          FAQ
        </TextAnimate>
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-3xl text-3xl text-black"
        >
          Frequently Asked Questions
        </TextAnimate>
      </div>
      {/* faq accordian  */}
      <div className=" flex flex-col gap-1">
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-medium">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
