# Page snapshot

```yaml
- generic [ref=e7]:
  - generic "company logo" [ref=e10]:
    - img [ref=e11]
  - generic [ref=e13]: Sign-in
  - heading "Don't have an account? Sign up" [level=6] [ref=e15]
  - generic [ref=e18]:
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e24]: Email
        - generic [ref=e25]:
          - textbox "name@example.com" [ref=e26]: prabhakaran.s@trackdfect.com
          - group
      - button "Continue" [disabled]:
        - generic:
          - progressbar "Continue":
            - img
        - text: Continue
    - generic [ref=e27]:
      - generic [ref=e31]: or sign in with
      - generic [ref=e33]:
        - button "continue with google" [ref=e34] [cursor=pointer]:
          - img [ref=e37]
          - text: Google
        - button "continue with microsoft" [ref=e42] [cursor=pointer]:
          - img [ref=e45]
          - text: Microsoft
  - paragraph [ref=e52]: "For Help: Please contact support@spendflo.com"
  - link "powered by frontegg" [ref=e54] [cursor=pointer]:
    - /url: https://frontegg.com
    - img [ref=e55]
```