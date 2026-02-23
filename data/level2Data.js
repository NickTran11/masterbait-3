window.LEVEL_DATA = window.LEVEL_DATA || {};

window.LEVEL_DATA[2] = {
  meta: {
    title: "Tutorial",
    objective: "Learn controls + spot obvious red flags",
    minutes: 5
  },
  emails: [
    {
      id: "l2-e1",
      fromName: "IT Support",
      fromEmail: "support@micros0ft-secure-login.com",
      subject: "URGENT: Account locked",
      preview: "Click to verify your account…",
      tag: "Suspicious",
      tagType: "bad", // bad | ok | neutral
      bodyHtml: `
        <p><b>Heya,</b></p>
        <p>We detected unusual activity. Click below to verify your account immediately:</p>
        <p class="link">http://micros0ft-secure-login.com/verify</p>
        <p>Thanks,<br/>Billing Team</p>
      `
    }
  ]
};