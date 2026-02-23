window.LEVEL_DATA = window.LEVEL_DATA || {};

window.LEVEL_DATA[1] = {
  meta: {
    title: "Tutorial",
    objective: "Learn controls + spot obvious red flags",
    minutes: 5
  },

  // totalItems should be how many emails you want to "resolve"
  // (report/delete/open/reply can resolve; inspect usually doesn't)
  totalItems: 1,

  emails: [
    {
      id: "l1-e1",
      fromName: "IT Support",
      fromEmail: "support@micros0ft-secure-login.com",
      subject: "URGENT: Account locked",
      preview: "Click to verify your account…",
      tag: "Suspicious",
      tagType: "bad", // bad | ok | neutral

      bodyHtml: `
        <p><b>Hello!,</b></p>
        <p>We detected unusual activity. Click below to verify your account immediately:</p>
        <p class="link">http://micros0ft-secure-login.com/verify</p>
        <p>Thanks,<br/>Billing Team</p>
      `,

      // Optional extra info for Inspect
      inspectInfo: {
        expectedDomain: "microsoft.com",
        clues: [
          "Look closely at the domain: micros0ft (zero) ≠ microsoft.",
          "Urgency + threat (“disabled in minutes”) is a common phishing trick.",
          "The link domain matches the suspicious sender domain."
        ]
      },

      // Action outcomes:
      // markResolved = should this action "finish" the email (remove from inbox / count progress)
      actions: {
        inspect: {
          scoreDelta: 0,
          progressDelta: 0,
          markResolved: false,
          feedbackTitle: "Inspect: Sender details",
          feedbackHtml: `
            <p><b>Domain check:</b> <span class="link">${"micros0ft-secure-login.com"}</span></p>
            <p><b>Expected:</b> ${"microsoft.com"}</p>
            <ul>
              <li>Micros<strong>0</strong>ft uses a zero (typo-squatting).</li>
              <li>Urgency + threat is a classic red flag.</li>
              <li>Suspicious link domain matches the suspicious sender.</li>
            </ul>
          `
        },

        report: {
          scoreDelta: 20,
          progressDelta: 1,
          markResolved: true,
          resolveMode: "remove",
          feedbackTitle: "Reported ✅",
          feedbackHtml: `
            <p>Great call. Reporting helps protect others and alerts IT/security.</p>
            <p><b>Why it’s suspicious:</b> typo domain + urgency + risky link.</p>
          `
        },

        delete: {
          scoreDelta: 10,
          progressDelta: 1,
          markResolved: true,
          resolveMode: "remove",
          feedbackTitle: "Deleted",
          feedbackHtml: `
            <p>Deleting removes the immediate risk. Reporting would also help protect others.</p>
          `
        },

        open: {
          scoreDelta: -15,
          progressDelta: 1,
          markResolved: true,
          resolveMode: "remove",
          feedbackTitle: "You clicked the link 😬",
          feedbackHtml: `
            <p>In real life, this could lead to credential theft or malware.</p>
            <p><b>Lesson:</b> Inspect the sender + hover links before clicking.</p>
          `
        },

        reply: {
          scoreDelta: -10,
          progressDelta: 1,
          markResolved: true,
          resolveMode: "remove",
          feedbackTitle: "Reply sent (bad idea)",
          feedbackHtml: `
            <p>Replying can confirm your address is active and pull you into a conversation scam.</p>
            <p><b>Better:</b> Report or delete suspicious messages.</p>
          `
        }
      }
    }
  ]
};