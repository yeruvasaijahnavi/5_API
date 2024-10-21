"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const getInputValue = (id) => { var _a; return ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || ""; };
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateContact = (contact) => /^\d{10}$/.test(contact);
const validateFormData = (formData) => {
    if (!formData.name ||
        !formData.email ||
        !formData.contact ||
        !formData.subject ||
        !formData.message) {
        return "All fields are required.";
    }
    if (!validateEmail(formData.email)) {
        return "Please enter a valid email address.";
    }
    if (!validateContact(formData.contact)) {
        return "Please enter a valid 10-digit contact number.";
    }
    if (formData.name.length > 50) {
        return "Name must be 50 characters or less.";
    }
    if (formData.message.length > 500) {
        return "Message must be 500 characters or less.";
    }
    return null; // All validations passed
};
(_a = document
    .getElementById("contactForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        event.preventDefault(); // Prevents the default form submission
        // Collect form data
        const formData = {
            name: getInputValue("name"),
            email: getInputValue("email"),
            contact: getInputValue("contact"),
            subject: getInputValue("subject"),
            message: ((_a = document.getElementById("message")) === null || _a === void 0 ? void 0 : _a.value) || "",
        };
        // Validate form data
        const validationError = validateFormData(formData);
        if (validationError) {
            alert(validationError);
            return;
        }
        try {
            // Send POST request to MockAPI
            const response = yield fetch("https://671649ac33bc2bfe40bd4602.mockapi.io/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify content type
                },
                body: JSON.stringify(formData), // Convert form data to JSON
            });
            // Handle the API response
            if (response.ok) {
                const jsonResponse = yield response.json();
                alert("Form submitted successfully! Submission ID: " +
                    jsonResponse.id);
            }
            else {
                alert("Failed to submit the form");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form");
        }
    });
});
