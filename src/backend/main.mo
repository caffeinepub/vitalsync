import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Text "mo:core/Text";

actor {
  type Signup = {
    name : Text;
    email : Text;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  let signups = List.empty<Signup>();
  let contactForms = List.empty<ContactForm>();

  public shared ({ caller }) func submitSignup(name : Text, email : Text) : async () {
    if (email.isEmpty() or name.isEmpty()) {
      Runtime.trap("Invalid input. Name and email cannot be empty.");
    };

    let signup : Signup = {
      name;
      email;
    };
    signups.add(signup);
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    if (message.isEmpty() or email.isEmpty() or name.isEmpty()) {
      Runtime.trap("Invalid input. Name, email, and message cannot be empty.");
    };

    let contactForm : ContactForm = {
      name;
      email;
      message;
    };
    contactForms.add(contactForm);
  };

  public query ({ caller }) func getAllSignups() : async [Signup] {
    signups.toArray();
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    contactForms.toArray();
  };
};
