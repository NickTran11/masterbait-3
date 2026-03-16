window.LEVEL1_EMAIL = {
  folderName: "Inbox",
  messages: [
    {
      id: "msg-1",
      sender: "ThingSpeak Trial Program",
      senderInitials: "TP",
      fromName: "ThingSpeak Trial Program",
      fromEmail: "<trials@mail.thingspeak.com>",
      toEmail: "Bach Tran",
      time: "Sat 3/14/2026 6:15 AM",
      subject: "ACTION REQUIRED - You have exceeded the usage limit for your ThingSpeak account",
      previewTop: "ACTION REQUIRED - Y...",
      previewBottom: "CAUTION - EXTERNAL EMAIL This e-mail has originated from outside...",
      external: true,
      suspicious: true,
      body: {
        greeting: "Hello Bach,",
        paragraphs: [
          "You have exceeded the message limit for your ThingSpeak account bach.tran@edu.sait.ca. All channels for this account are no longer collecting data.",
          "Consider upgrading to a paid license to resume collection of data on your channels prior to the anniversary date of your account.",
          "For details on your message usage and to upgrade to a paid license, see the My Account page."
        ],
        closing: "Thank you,\nThe ThingSpeak Team"
      },
      inspector: {
        returnPath: "bounce-1832@mailer.thingspeak-notice.net",
        replyTo: "support-upgrade@thingspeak-billing-help.com",
        linkPreview: "https://thingspeak-upgrade-portal.com/account/recover"
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
