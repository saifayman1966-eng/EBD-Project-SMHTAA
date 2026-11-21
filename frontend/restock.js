
const RESTOCK_STYLES = `
.restock-dialog {
  width: min(90%, 440px);
  padding: 0;
  border: none;
  border-radius: 12px;
  color: #211b18;
  background: #fff;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
}

.restock-dialog::backdrop {
  background: rgba(25, 20, 17, .65);
  backdrop-filter: blur(3px);
}

.restock-content {
  padding: 32px;
  font-family: Arial, sans-serif;
}

.restock-content h2 {
  margin: 0 0 12px;
  font-family: Georgia, serif;
  font-weight: 500;
  font-size: 27px;
}

.restock-content p {
  color: #71645b;
  line-height: 1.6;
}

.restock-content label {
  display: block;
  margin: 22px 0 8px;
  font-size: 14px;
}

.restock-content input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid #d8cec5;
  border-radius: 6px;
  font-size: 15px;
}

.restock-content input:focus {
  outline: 2px solid #8d5e45;
}

.restock-actions {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}

.restock-actions button {
  flex: 1;
  padding: 13px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.restock-submit {
  border: none;
  background: #211b18;
  color: white;
}

.restock-cancel {
  border: 1px solid #d8cec5;
  background: white;
  color: #211b18;
}

.restock-message {
  margin-top: 15px;
  font-size: 14px;
}
`;

let restockStyleAdded = false;

export function openRestockInterface(productId) {
  if (!productId) {
    console.error("A valid product ID is required.");
    return;
  }

  if (!restockStyleAdded) {
    const style = document.createElement("style");
    style.textContent = RESTOCK_STYLES;
    document.head.appendChild(style);
    restockStyleAdded = true;
  }

  const dialog = document.createElement("dialog");
  dialog.className = "restock-dialog";

  dialog.innerHTML = `
    <div class="restock-content">
      <h2>Be the first to know.</h2>

      <p>
        This fragrance is currently out of stock.
        Leave your email address and we'll let you know
        when it becomes available again.
      </p>

      <form class="restock-form">
        <label for="restock-email">
          Your email address
        </label>

        <input
          id="restock-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <div class="restock-actions">
          <button type="button" class="restock-cancel">
            Cancel
          </button>

          <button type="submit" class="restock-submit">
            Notify Me
          </button>
        </div>

        <p class="restock-message" role="status"></p>
      </form>
    </div>
  `;

  document.body.appendChild(dialog);

  const form = dialog.querySelector(".restock-form");
  const emailInput = dialog.querySelector("#restock-email");
  const message = dialog.querySelector(".restock-message");

  function closeDialog() {
    dialog.close();
    dialog.remove();
  }

  dialog.querySelector(".restock-cancel")
    .addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  dialog.addEventListener("close", () => dialog.remove());

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    message.textContent =
      "Thank you! Your email has been entered successfully. Backend connection is needed to save your request.";

    emailInput.disabled = true;
    form.querySelector(".restock-submit").disabled = true;
    form.querySelector(".restock-submit").textContent = "Submitted";
  });

  dialog.showModal();
  emailInput.focus();
}
