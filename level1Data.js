window.LEVEL1_EMAIL = {
  scenario: {
    codename: "BACH TRAN",
    title: "IT Student Intern",
    description: "You are checking your school inbox during a busy evening and receive a reward email claiming you won an Amazon gift card.",
    strengths: [
      "Careful reader",
      "Knows common online scams",
      "Will inspect links before trusting them"
    ],
    weaknesses: [
      "Can be tempted by urgent rewards",
      "May act too fast when tired"
    ],
    context: "Your goal is to decide whether this email is legitimate or a phishing attempt. Inspect the sender, message tone, and the real destination of the link before acting.",
    initials: "BT"
  },

  folderName: "Inbox",
  messages: [
    {
      id: "msg-1",
      sender: "Amazon Rewards Center",
      senderInitials: "AM",
      fromName: "Amazon Rewards Center",
      fromEmail: "<offers@amazon-reward-center-mail.com>",
      toEmail: "Bach Tran",
      time: "Sun 3/15/2026 9:52 PM",
      subject: "Congratulations! Claim your Amazon gift card reward today",
      previewTop: "Congratulations! Claim your Amazon reward",
      previewBottom: "External email offering a gift card and asking the user to act quickly...",
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
        prompt: "In this email, what official website/domain should you manually type in your browser instead of clicking the email link?",
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
