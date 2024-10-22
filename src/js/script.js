var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var getInputValue = function (id) { var _a; return ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || ""; };
var validateEmail = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
var validateContact = function (contact) { return /^\d{10}$/.test(contact); };
var validateFormData = function (formData) {
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
    return __awaiter(this, void 0, void 0, function () {
        var formData, validationError, response, jsonResponse, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault(); // Prevents the default form submission
                    formData = {
                        name: getInputValue("name"),
                        email: getInputValue("email"),
                        contact: getInputValue("contact"),
                        subject: getInputValue("subject"),
                        message: ((_a = document.getElementById("message")) === null || _a === void 0 ? void 0 : _a.value) || "",
                    };
                    validationError = validateFormData(formData);
                    if (validationError) {
                        alert(validationError);
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://671649ac33bc2bfe40bd4602.mockapi.io/api/contacts", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json", // Specify content type
                            },
                            body: JSON.stringify(formData), // Convert form data to JSON
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    jsonResponse = _b.sent();
                    alert("Form submitted successfully! Submission ID: " +
                        jsonResponse.id);
                    return [3 /*break*/, 5];
                case 4:
                    alert("Failed to submit the form");
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.error("Error:", error_1);
                    alert("An error occurred while submitting the form");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
});
