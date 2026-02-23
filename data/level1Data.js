window.LEVEL_DATA = window.LEVEL_DATA || {};

window.LEVEL_DATA[1] = {
  meta: {
    title: "Tutorial",
    objective: "Learn controls + spot obvious red flags",
    minutes: 5
  },
  emails: [
    {
      id: "l1-e1",
      fromName: "IT Support",
      fromEmail: "support@micros0ft-secure-login.com",
      subject: "URGENT: Account locked",
      preview: "Click to verify your account…",
      tag: "Suspicious",
      tagType: "bad",
      bodyHtml: `
        <p><b>Hello,</b></p>
        <p>We detected unusual activity. Click below to verify your account immediately:</p>
        <p class="link">http://micros0ft-secure-login.com/verify</p>
        <p>Thanks,<br/>Billing Team</p>
      `,
      actions: {
        report: {
          scoreDelta: 10,
          progressDelta: 1,
          markResolved: true,
          coach: {
            bubbleText: "Well done.\nYou passed this level.",
            title: "Perfect!",
            lessons: [
              "Urgency + threat is bait (pressure tactics).",
              "Suspicious domain: look for 0 vs o, extra words, weird hyphens.",
              "Safest move: report it or contact IT through a trusted channel."
            ]
          }
        },

        inspect: {
          scoreDelta: 0,              // no points
          progressDelta: 0,
          coach: {
            bubbleText: "Nice check.\nThis helps confirm your suspicion.",
            title: "Inspect (Info)",
            lessons: [
              "Look closely at the sender domain (typos, extra words, odd TLD).",
              "Hover links (later) to see the real destination.",
              "Check for generic greeting + pressure language."
            ]
          }
        },

        openLink: {
          scoreDelta: 0,
          progressDelta: 0,
          coach: {
            bubbleText: "Oof.\nThat’s the risky move.",
            title: "Bad call!",
            lessons: [
              "Clicking unknown links can lead to credential theft.",
              "Always verify the sender using a trusted method.",
              "When in doubt: report."
            ]
          }
        },

        delete: {
          scoreDelta: 2,
          progressDelta: 1,
          markResolved: true,
          coach: {
            bubbleText: "Good instinct.\nBut reporting is even better.",
            title: "Okay!",
            lessons: [
              "Deleting removes it from your inbox.",
              "Reporting also helps protect other people."
            ]
          }
        },

        reply: {
          scoreDelta: 0,
          progressDelta: 0,
          coach: {
            bubbleText: "Careful.\nReplying can confirm your address is active.",
            title: "Not recommended",
            lessons: [
              "Replying can encourage more phishing attempts.",
              "Use official channels to verify instead."
            ]
          }
        }
      }
    }
  ]
};