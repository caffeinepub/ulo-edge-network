# Specification

## Summary
**Goal:** Fix public lease listings to display all available leases without requiring authentication.

**Planned changes:**
- Fix backend public query method to return all lease listings without authentication
- Update LeaseListings component to fetch and display all leases with partial code format (first 4 chars + '...' + first 4 chars after last hyphen)
- Display split ratio and availability status with color coding (green for Available, red/grayed for Unavailable)
- Add copy button for each listing to copy full UUID to clipboard
- Disable copy button and show "already in use" message for unavailable leases
- Show friendly empty state message when no leases exist

**User-visible outcome:** Users can view all available ULO lease listings on the homepage without logging in, see partial lease codes, split ratios, and availability status, and copy full lease codes to clipboard with one click.
