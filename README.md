JSON Country Data
=================

Generates a JSON data file (`data.json`) for most countries/territories on the planet (197 at last Googling.) The data contains currency codes, Emoji flags, phone codes, and capitals. Can add more fields later.

A small personal exercise in understanding '[locales](https://en.wikipedia.org/wiki/Locale_(computer_software))' and a few of the myriad standards associated with them. Also got tired of Googling for "JSON country list" and using crap that was incomplete or inaccurate.

### Development

Adjust country display names and emoji mappings with `sources/adjustments.js`. Then run:

```bash
node generate.js
# Then see "data.json"
```

### Standards

- [ISO 639-1 Language Codes](https://www.loc.gov/standards/iso639-2/php/code_list.php). These are lower-cased, two-letter codes (`en`, `pt`, `fr`, `es`)
- [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for UPPER-cased, two-letter country/territory codes (`US`, `BR`, `AU`)
- [The United Nations' UNTERM Database](https://unterm.un.org/unterm/search?urlQuery=united%20states%20of%20america%20%28the%29) for canonical country/territory names
  - Well for the _most_ part. See `src/tooling/i18n/adjustments.js` for a small list of names edited for brevity and/or clarity. This is the only deviation from standard.
- [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) for currencies (`USD`, `BRL`, `AUD`)
- [ITU-T](https://en.wikipedia.org/wiki/ITU-T) standards for phone codes
  - Note that there may be multiple codes for a given country/territory!

### Data Sources

This uses [DataHub](https://datahub.io/collections)'s excellent, freely available datasets for country/territory data that adheres to the standards above.

- [Country/Territory Data](https://datahub.io/core/country-codes). This is wonderful for being free. Can augment the country/territory data with many other things should they be required (e.g. local names, valid locales, and postal codes.)
- [Country/Territory Flags from this YUGE emoji dataset](https://datahub.io/core/unicode-emojis) 😍

### License

[WTFPL](http://www.wtfpl.net/txt/copying/)
