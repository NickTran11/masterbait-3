window.LEVEL2_EMAIL = {
  scenario: {
    codename: "ALEXISKA VANZ",
    title: "Egirl Gamer",
    description: "You are Alexiska Vanz, scrolling through social media at home watching posts, reels and messages online.",
    profile: [
      "Popular egirl gamer, influencer",
      "Active on social media",
      "Friendly and open to all DMs"
    ],
    habits: [
      "Explore new feeds and make new friends",
      "Follows creators and trend pages",
      "Always catch on trends, fear of missing out"
    ],
    context: "Inspect the feed, account details and direct messages. Decide the safest action without falling for the bait."
  },

  messages: [
    {
      id: "social-1",
      postAccountName: "trend.giveaway_now",
      postCaption: "Last 100 winners only 🎁 Comment “WIN” and tap the link in bio to claim your gift card now.",
      bioPreview: "Link in bio: prize-claim-fast.net/winner",
      dmMessage: "Hey Sophie, you were selected for our private winner list. Tap this secret creator link before the reward expires.",
      dmLink: "creator-prize-access.com/claim",
      commentCount: "57",
      inspector: {
        username: "trend.giveaway_now",
        profileAge: "2 days old",
        linkInBio: "prize-claim-fast.net/winner"
      },

      correctAction: "report",
      partialAction: "verify",

      orderedHints: [
        "The account looks popular at first glance, but the username is generic and the profile is very new.",
        "The reel uses urgency: 'last 100 winners only' and 'claim now'. Pressure is a common scam tactic.",
        "The DM and the reel both push you toward outside links instead of an official verified profile.",
        "The safest move is to report the suspicious content and verify the creator from an official, verified account or website."
      ],

      verification: {
        prompt: "What is the safest way to verify a giveaway account before trusting it?",
        acceptedAnswers: [
          "verified account",
          "check verified account",
          "official profile",
          "official website",
          "check official website",
          "verify the official account"
        ],
        retryGuidance: [
          "Not quite. Do not trust the link in the post or DM. Think about how to verify the real account.",
          "Still not right. Look for an official verified profile or trusted official website.",
          "Use the real creator’s verified account or official website."
        ]
      },

      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Nice catch.\nThat reel was bait.",
          lessons: [
            "Fake giveaways often use urgency, hype, and exclusivity.",
            "A suspicious bio link and DM link are major red flags.",
            "Safest move: report it and verify the creator from a real official source."
          ]
        },
        good: {
          title: "Good thinking!",
          bubble: "Better.\nYou slowed down.",
          lessons: [
            "Verifying a creator is much safer than tapping random links.",
            "Still, when content looks scammy, reporting it is the strongest move.",
            "Good instinct — but there is one safer action."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "Oops.\nThat social post was phishing.",
          lessons: [
            "Scammers use reels, DMs, and fake hype to create trust fast.",
            "Never trust a giveaway just because it looks popular.",
            "Check the official verified account, not the link they push."
          ]
        }
      }
    }
  ]
};
