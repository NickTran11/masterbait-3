window.LEVEL1_EMAIL = {
  folderName: "Inbox",
  messages: [
    {
      id: "msg-1",
      sender: "Amazon Official",
      senderInitials: "A",
      fromName: "Amazon Official",
      fromEmail: "<amazon-rep@mail.com>",
      toEmail: "Ben Dover",
      time: "Sat 3/14/2026 6:15 AM",
      subject: "CONGRATUALATION - You have been chosen to enter Amazon giveaways",
      previewTop: "CONGRATUALATION - Y...",
      previewBottom: "TRUSTED - OFFICIAL EMAIL This e-mail has originated from Amazon...",
      external: true,
      suspicious: true,
      body: {
        greeting: "Hello Ben,",
        paragraphs: [
          "You have been chosen as our lucky customer to enter Amazon giveaways bendover@email.com . There are only 20 spots and you are that lucky!",
          "Claim your free Amazon giveaways now by enter this link in order to spin the wheel and receive your prize.",
          "Don't trust us? See our official page for more details Amazon.com page."
        ],
        closing: "Congratualation,\nAmazon Team"
      },
      inspector: {
        returnPath: "bounce-1832@mailer.amazon-notice.net",
        replyTo: "support-upgrade@amazon-billing-help.com",
        linkPreview: "https://amazon-upgrade-portal.com/giveaways/enter"
      },
      correctAction: "report",
      goodAction: "callit",
      clues: [
        "External email warning banner is present.",
        "Reply-To is different from the From address.",
        "Link preview points to a suspicious upgrade portal domain.",
        "Message creates urgency around account disruption."
      ]
    }
  ]
};
