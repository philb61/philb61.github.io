(function() {
  var loadLanguageData;

  loadLanguageData = function(data) {
    var elements;
    elements = d3.select('#translations').selectAll('.translatableItem').data(Object.keys(data), function(d) {
      return d;
    });
    elements.enter().append('div').attr('class', 'translatableItem').each(function(d, i) {
      var div;
      div = d3.select(this);
      div.append('textarea').attr('class', "original").attr('disabled', true).text(d);
      return div.append('textarea').attr('class', "translated").attr('placeholder', d).text(function(d) {
        if (d !== data[d]) {
          return data[d];
        }
      });
    });
    return elements.exit().remove();
  };

  d3.json('/data/en.json', function(err, data) {
    if (err) {
      return console.log(err);
    }
    return loadLanguageData(data);
  });

  d3.select('#loadTranslation').on('click', function() {
    var content;
    content = JSON.parse(d3.select('#generated')[0][0].value);
    loadLanguageData(content);
    return event.preventDefault();
  });

  d3.select('#generateTranslation').on('click', function() {
    var trans;
    console.debug('Generating translation...');
    trans = {};
    d3.selectAll('.translatableItem').each(function() {
      var div, original, translated;
      div = d3.select(this);
      original = div.select('.original')[0][0].value;
      translated = div.select('.translated')[0][0].value;
      return trans[original] = translated;
    });
    d3.select('#generated')[0][0].value = JSON.stringify(trans);
    return event.preventDefault();
  });

}).call(this);
