/**
  A computed property which takes an array of arrays, flatten single
  level of them and returns the result.

  Optionally, it can take a list of objects, get a property from
  each object (which is expected to be an array) and return one
  array being a concatenation of those partial ones.

  Example

  ```javascript
  var item1 = Ember.Object.create({
    tags: [ 'important', 'bug', 'task' ],
  });

  var item2 = Ember.Object.create({
    tags: [ 'urgent', 'feature', 'task' ],
  });

  App.ItemList = Ember.ArrayProxy.extend({
    allTags: Ember.computed.flattenArray( 'content', 'tags' )
  });

  var myList = App.ItemList.create({ content: [ item1, item2 ] });
  myList.get( 'allTags' );
  // -> ["important", "bug", "task", "urgent", "feature", "task"]
  ```

  To use without a key:

  ```javascript
  App.ItemList = Ember.ArrayProxy.extend({
    tagMap: Ember.computed.mapBy( 'content', 'tags' );
    allTags: Ember.computed.flattenArray( 'tagMap' )
  });

  var myList = App.ItemList.create({ content: [ item1, item2 ] });
  myList.get( 'allTags' );
  // -> ["important", "bug", "task", "urgent", "feature", "task"]
  ```

  @method computed.flattenArray
  @for Ember
  @param {String} sourceArrayProperty
  @param {String} (optional) if given, values from sourceArray are
  treated as objects, and property named by the `key` will be extracted
  from them. If `key` is not given, the values from sourceArray are
  expected to be the arrays to be flattened.
  @return {Ember.ComputedProperty} computes a new flattened array from
  the input
*/

Ember.computed.flattenArray = function(nestedArray, key) {
  return Ember.arrayComputed(nestedArray, {
    initialize: function(array, changeMeta, instanceMeta) {
      instanceMeta.lengths = [];
      instanceMeta.listeners = [];
      return array;
    },
    addedItem: function(array, item, changeMeta, instanceMeta) {
      var args, flat, i, len, listener, localIndex;

      if (item != null) {
        if (key != null) {
          flat = item.get( key );
        } else {
          flat = item;
        }
      } else {
        flat = null;
      }
      if (flat != null) {
        listener = Ember.Object.create({
          flat: flat,
          arrayWillChange: function() {},
          arrayDidChange: function(source_list, start, remove_count, add_count) {
            var args, i, idx, lidx, rem_amt, source_slice, len;
            idx = 0;
            lidx = 0;
            for (i = 0, len = instanceMeta.listeners.length; i < len; i++) {
              if (instanceMeta.listeners[i] === this) {
                break;
              }
              lidx += 1;
              idx += instanceMeta.lengths[i];
            }

            source_slice = [];
            if (add_count < 0) {
              source_slice = source_list.slice(0);
            } else {
              if (add_count > 0) {
                source_slice = source_list.slice(start, start + add_count);
              }
            }

            rem_amt = 0;
            if (remove_count < 0) {
              rem_amt = instanceMeta.lengths[lidx];
            } else {
              rem_amt = remove_count;
            }
            instanceMeta.lengths[lidx] += source_slice.length - rem_amt;
            args = [ idx + start, rem_amt ].concat( source_slice );

            array.arrayContentWillChange(idx + start, rem_amt, source_slice.length);
            array.splice.apply(array, args);
            array.arrayContentDidChange(idx + start, rem_amt, source_slice.length);
          }
        });
        flat.addArrayObserver(listener);
      }
      localIndex = 0;
      for (i = 0; i < changeMeta.index; i++ ) {
        localIndex += instanceMeta.lengths[i];
      }
      if (flat != null) {
        len = flat.get('length');
      } else {
        len = 0;
      }
      instanceMeta.lengths.splice(changeMeta.index, 0, len);
      instanceMeta.listeners.splice(changeMeta.index, 0, listener);
      args = [localIndex, 0];
      if (flat != null) {
        args = args.concat(flat);
      }

      array.arrayContentWillChange(localIndex, 0, len);
      array.splice.apply(array, args);
      array.arrayContentDidChange(localIndex, 0, len);

      return array;
    },
    removedItem: function(array, item, changeMeta, instanceMeta) {
      var i, listener, localIndex, old_len, flat;
      localIndex = 0;
      for (i = 0; i < changeMeta.index; i++ ) {
        localIndex += instanceMeta.lengths[i];
      }
      old_len = instanceMeta.lengths[changeMeta.index];
      instanceMeta.lengths.splice(changeMeta.index, 1);
      listener = instanceMeta.listeners[changeMeta.index];
      if (listener != null) {
        if ((flat = listener.get('flat')) != null) {
          flat.removeArrayObserver(listener);
        }
      }
      instanceMeta.listeners.splice(changeMeta.index, 1);

      array.arrayContentWillChange(localIndex, old_len, 0);
      array.splice(localIndex, old_len);
      array.arrayContentDidChange(localIndex, old_len, 0);

      return array;
    }
  });
};
