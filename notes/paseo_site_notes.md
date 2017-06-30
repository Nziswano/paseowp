# What am I trying to do?

## Goals
1. Prototype site. Create a prototype site for Paseo. This includes the church, school and the Martin family.
1. Has to be static but able to pull from a dynamic system
1. Trying to learn enough node.js so I can actually use it to build a dynamic web site.
1. Might want to create a DSL for foundation so I can generate forms without have to do too much programming.

## Tasks
1. Setup a node system for development. Having a hard time nailing down what I want to do.
  1. Seems like Express with handlebars is my best bet. At least in the short term.
  2. Can look at other frameworks later when my needs change.
1. Create the design for the site.
  1. Need to get a basic site together for just the school so we can start pushing it major.

## What we're doing
1. Build a static site just using Foundation and it's starter template
  * Has everything I need to create the basic site layout. Should help with rapid prototyping
1. Convert the site to a dynamic site while still using the basic Foundation template.

### What I'm going to do.
1. Fork the template on github
1. Clone the fork to my machine.
  1. Won't need to use compass
1. Build the prototype. Luckily the static site already uses handlebars as a template language.

# Creating church marketing sites
Idea is that we're going to put the church, school and missionary ministry online. Biggest issues is generating content for the sites. Will try and stick to a pattern for all the sites

## Church - people who would like to know more about the church. Members trying to keep up with what is going on at the church
* Home - events, location, hours
* About
* Ministry
* Service
* History
* Projects
  * Building Project
## The Martins - Find out what the Martins are about and why you should support their work. Bio about what they've done and what they're going to do.
* Home - newsletter, family update, ministry
* About - History, bio, background
* Ministry - church, preschool, other churches started
* Support - support page for ongoing support
## Preschool - new parents trying to find out more about he creche
* Home - new parents interested in finding out more about the school
  * Philosophy
  * Enrollment
* About - philosophy, history,
* News - updates about events, new things going on. Changes
* Contact - contact information and form
* Enrollment - Information about fees, schedule, activities
* Resources
  * Local family events
  * Information sources
  * Check your creche
## Shared features
* Images
* Social media accounts
  * Separate for church, sheriffa and school
    * Twitter, Facebook, Instagram, Pinterest
    * Mailchimp newsletter

## Infrastructure
* Shared digital asset management repository
* Shared templates
* Stylesheets customized for each environment
* Static site hosted via CDN
* Generated dynamically
* Separation between content generation and content publishing.
  * Build the content management side on a JCR platform.
  * Access the content via APIs to show site.
  * Content optimized for smart phones/mobile phones.
