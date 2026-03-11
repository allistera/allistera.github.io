---
title: Mass Uninstall iOS Apps with Apple Configurator on Mac
description: Stop removing apps one by one — Apple Configurator lets you select and uninstall multiple apps from iOS devices in a single action, saving significant time when managing many devices or doing a spring clean.
date: 2026-03-11
---

# Mass Uninstall iOS Apps with Apple Configurator on Mac

If you've ever tried to clear out a cluttered iPhone or iPad by removing apps one by one — tap the icon, hold, tap "Remove App", tap "Delete App", confirm — you'll know how tedious it gets. Repeat that process 20 or 30 times and you've burned through a chunk of your afternoon. Apple Configurator 2, a free Mac app from Apple, offers a far more efficient approach: select all the apps you want gone and remove them in one shot.

## What Is Apple Configurator?

Apple Configurator 2 is a Mac utility primarily aimed at IT administrators who manage fleets of iOS and iPadOS devices — think schools, businesses, or hospitals deploying dozens of iPads. However, it's just as useful for individuals who want finer control over their personal devices than the Settings app provides. It's free on the Mac App Store and works with iPhones, iPads, and Apple TV.

## The Problem with Doing It on the Device Itself

On the device, your options are limited:

- **Long-press and jiggle mode** — you can only delete one app at a time
- **Settings > General > iPhone Storage** — lets you offload or delete apps, but still one at a time
- **Screen Time restrictions** — can block apps but doesn't remove them

There is no native way on iOS to select multiple apps and delete them all at once. Apple Configurator fills that gap entirely.

## Setting Up Apple Configurator

1. **Download Apple Configurator 2** from the Mac App Store (it's free)
2. **Connect your iPhone or iPad** to your Mac via a USB or USB-C cable
3. **Trust the connection** — on your iPhone, tap "Trust" when the prompt appears and enter your passcode
4. Your device will appear in the Configurator window

That's all the setup required. No MDM enrolment, no Apple Business Manager account needed for basic personal use.

## Mass Uninstalling Apps

Once your device is connected:

1. **Select your device** in the Configurator sidebar
2. Click **Actions** in the menu bar → **Add** → or navigate to the **Apps** section by right-clicking the device and selecting **Show Apps**
3. In the apps view, you'll see every user-installed app on the device with its name, version, and size
4. **Select multiple apps** by holding `⌘` (Command) and clicking each one, or use `⇧` (Shift) to select a range
5. Right-click the selection and choose **Remove**
6. Confirm the removal

Configurator pushes the uninstall commands to the device and all selected apps disappear simultaneously. What would have taken 10 minutes of tapping now takes about 10 seconds.

## Practical Use Cases

**Spring cleaning a personal device** — Going through your app list once a year and removing everything you haven't opened in months is much faster when you can tick off 30 apps at once.

**Preparing a device for resale** — Rather than doing a full factory reset (which means restoring and re-setting everything), you can surgically remove personal apps while leaving the OS configuration intact.

**Setting up a child's device** — Install everything first, then remove whatever you don't want to keep with one sweep rather than hunting through the home screen.

**IT and classroom management** — The scenario Configurator was built for. Removing old curriculum apps from 30 student iPads before a new school year is the kind of task that would otherwise take hours.

## A Few Things to Keep in Mind

- **Only user-installed apps can be removed** — system apps like Safari, Messages, and the App Store are protected and won't appear as removable
- **The apps are fully deleted**, not just offloaded — if you want to get one back, you'll need to re-download it from the App Store
- **Configurator doesn't require supervision** for basic operations like this on a personal device — supervision is needed for more advanced management features
- **Your device stays signed in** to iCloud and all your accounts; removing apps via Configurator doesn't affect your data elsewhere

## Worth Having in Your Toolkit

Apple Configurator is one of those tools that feels disproportionately powerful for how straightforward it is to use. You don't need to be a sysadmin to benefit from it. If you ever find yourself staring down a home screen full of apps you want gone, or handing a device to someone else and wanting it cleaned up quickly, it's a much better option than the repetitive tap-hold-delete dance iOS offers by default.

Download it, plug in your device, and you'll wonder why you ever did it the other way.
