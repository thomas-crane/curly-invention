module.exports = grammar({
  name: 'f',

  rules: {
    source_file: $ => repeat($._declaration),

    word: $ => $.identifier,

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
      $.param_list,
    ),

    param_list: $ => seq(
      '(',
      $.identifier, // TODO improve
      ')'
    ),

    var_declaration: $ => seq('let', $.identifier, '=', $._expression),

    /* Primitives. */
    number: _ => /\d+(\.\d+)?/,
    identifier: _ => /[A-Za-z_][A-Za-z_0-9]*/,
  }
});
