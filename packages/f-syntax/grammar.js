module.exports = grammar({
  name: 'f',

  rules: {
    source_file: $ => repeat($._declaration),

    word: $ => $.identifier,

    /* Patterns */
    _pattern: $ => choice(
      $.name_pattern,
      $.tuple_pattern,
    ),

    name_pattern: $ => $.identifier,
    tuple_pattern: $ => seq(
      '(', $._pattern, repeat(seq(',', $._pattern)), ')',
    ),

    /* Expressions. */
    _expression: $ => choice(
      $.identifier,
      $.number,
    ),

    /* Declarations. */
    _declaration: $ => choice(
      $.fn_declaration,
      $.var_declaration,
    ),
    
    fn_declaration: $ => seq(
      'fn',
      $.identifier,
    ),

    var_declaration: $ => seq('let', $._pattern, '=', $._expression),

    /* Primitives. */
    number: _ => /\d+(\.\d+)?/,
    identifier: _ => /[A-Za-z_][A-Za-z_0-9]*/,
  }
});
