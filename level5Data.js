window.LEVEL1_EMAIL = {
  scenario: {
    codename: "CRISTIANA BLUM",
    title: "Company CEO",
    description: "You are Cristiana Blum, checking your email in your office and receive a reward email about abc.",
    profile: [
      "Active on social media",
      "Love shopping, makeup and boyfriend",
      "Online shopping on Amazon a lot"
    ],
    habits: [
      "Allow any cookie data that pops up",
      "Use discount, gift card, reward to buy things"
    ],
    context: "Your goal is to decide whether this email is legitimate or a phishing attempt. Inspect the sender, message tone, and the real destination of the link before acting.",
    initials: "CB"
  },

  folderName: "Inbox",
  messages: [
    {
      id: "msg-1",
      sender: "Amazon Rewards Center",
      senderInitials: "AM",
      fromName: "Amazon Rewards Center",
      fromEmail: "<offers@amazon-reward-center-mail.com>",
      toEmail: "Cristiana Blum",
      time: "Sun 3/15/2026 9:52 PM",
      subject: "Congratulations! Claim your Amazon gift card reward today",
      previewTop: "Congratulations! Claim your Amazon reward",
      previewBottom: "Check This!",
      external: true,
      suspicious: true,
      inspector: {
        returnPath: "bounce-4801@mailer.amazon-claim-notice.net",
        replyTo: "support@amazon-prize-claims-help.com",
        linkPreview: "https://amazon-gift-claim-center.com/reward/confirm"
      },
      correctAction: "report",
      partialAction: "callit",
      orderedHints: [
        "This email came from outside the organization. That does not automatically make it malicious, but it should make you more careful.",
        "The message uses reward language and urgency together: 'selected', '$100 gift card', and 'act quickly'. That combination is a common phishing tactic.",
        "The sender details are inconsistent. The visible sender, reply-to, and return-path do not match a trusted main Amazon domain pattern.",
        "The previewed link does not use Amazon’s real primary domain. A safer choice would be to type the official Amazon website manually in your browser."
      ],
      verification: {
        prompt: "In this email, Amazon is the company presented. What is the official website/domain of Amazon?",
        acceptedAnswers: [
          "amazon.com",
          "www.amazon.com",
          "amazon.ca",
          "www.amazon.ca"
        ],
        retryGuidance: [
          "Not quite. Do not copy the suspicious domain from the email. Think of Amazon’s real official website.",
          "Still not right. Try the main official Amazon domain only.",
          "Use the official base domain, for example: amazon.com"
        ]
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Well done.\nYou passed this level.",
          lessons: [
            "Urgency + reward bait is a classic phishing tactic.",
            "The sender, reply-to, and link domain do not match trusted Amazon patterns.",
            "Safest move: report it and use the official website manually."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Nice.\nYou reduced risk.",
          lessons: [
            "Verifying through an official channel is much safer than clicking.",
            "Still, workplace security policy usually expects phishing to be reported.",
            "Good instinct — but there is an even better answer here."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "Oof…\nThat link was bait.",
          lessons: [
            "Attackers want a fast click, not careful thinking.",
            "Never trust reward emails just because they look exciting.",
            "Check the real domain before you click anything."
          ]
        }
      }
    }
  ]
};
