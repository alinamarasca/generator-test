export const accordion = {
  component: ".accordion",
  header: ".accordion header",
  headerButton: ".accordion-button",
  collapsedContainer: ".accordion-collapse .collapse",
  openedContainer: ".accordion-collapse .collapse .show",
  body: ".accordion-item > .accordion-collapse  > .accordion-body"
};

export const form = {
  infoSection: ".info",
  initialText: ".info > p",
  toggleText: "a",
  collapsedText: ".collapse",
  openedCollapsedText: ".collapse.show",
  dataForm: ".accordion-collapse > .accordion-body:first-child",
  question: ".form-control",
  radioAnswer: ".form-check",
  radioInput: "input[type='radio']",
  numberInput: "input[type='number']",
  dateInput: "input[type='date']",
  label: "label.form-check-label",
  submitButton: "button[type='submit']",
  response: "pre",
  firstInnerForm:
    ":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control",
  secondInnerForm:
    ":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control",
  inputInnerForm: ".form-floating"
};

export const response = {
  responseField: "#bis-text",
  copyResponseButton: "button.btn-copy"
};
