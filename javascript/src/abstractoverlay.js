goog.provide('ee.AbstractOverlay');

goog.require('goog.events.EventTarget');

goog.forwardDeclare('ee.data.Profiler');



/**
 * An abstract class that is used to display Earth Engine tiles.
 * @param {string} url The url for fetching this layer's tiles.
 * @param {string} mapId The map ID for fetching this layer's tiles.
 * @param {string} token The temporary token for fetching tiles.
 * @param {Object=} opt_init Initialization options, of the same form as a
 *     google.maps.ImageMapTypeOptions object.
 * @param {ee.data.Profiler=} opt_profiler Map tile calculation cost will be
 *     sent to this profiler, if its enabled flag is set.
 * @constructor
 * @extends {goog.events.EventTarget}
 * @export
 * @ignore
 */
ee.AbstractOverlay = function(url, mapId, token, opt_init, opt_profiler) {
  goog.base(this);

  // Store mapId and token.
  this.mapId = mapId;
  this.token = token;

  /** @protected {string} The URL from which to fetch tiles. */
  this.url = url;
};
goog.inherits(ee.AbstractOverlay, goog.events.EventTarget);


/**
 * Implements getTile() for the google.maps.MapType interface.
 * @param {!google.maps.Point} coord Position of tile.
 * @param {number} zoom Zoom level.
 * @param {Node} ownerDocument Parent document.
 * @return {Node} Element or binary data to be displayed as a map
 *     tile.
 */
ee.AbstractOverlay.prototype.getTile = goog.abstractMethod;


/**
 * Constructs a tile ID.
 * @param {!google.maps.Point} coord The position of tile.
 * @param {number} zoom The zoom level.
 * @return {string} The ID of the tile.
 */
ee.AbstractOverlay.prototype.getTileId = function(coord, zoom) {
  var maxCoord = 1 << zoom;

  // Wrap longitude around.
  var x = coord.x % maxCoord;
  if (x < 0) {
    x += maxCoord;
  }
  return [this.mapId, zoom, x, coord.y].join('/');
};
