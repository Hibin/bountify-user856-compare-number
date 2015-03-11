#!/usr/bin/env nodejs

var read            = require( 'fs-readdir-recursive' )
    , fs            = require( 'fs' )
    , minimatch     = require( 'minimatch' )
    , cheerio       = require( 'cheerio' )
    , linebyline    = require( 'linebyline' )
    , $targetPath   = process.argv[2]
    , $targetFile   = process.argv[3]
    ;

var isHtml = function( $fileName ) {
    return minimatch( $fileName, '*.html' );
};

var $ranges = new Array();
var $lbl = linebyline( $targetFile );

$lbl.on( 'line', function( $line ) {
    var myArray = /^(\d+)_(\d+);/.exec( $line );

    myArray['min'] = parseFloat( myArray[1] );
    myArray['max'] = parseFloat( myArray[2] );

    $ranges.push( myArray );
});

$lbl.on( 'end', function() {
    console.log($ranges);
    var $files = read( $targetPath, isHtml );

    $files.forEach( function( $file ) {
        var $fileName = $targetPath + '/' + $file;
    
        fs.readFile( $fileName, function( $err, $data ) {
            if( $err ) throw $err;
    
            $ = cheerio.load( $data );
    
            var $finalPrice = parseFloat( $( 'div#final_price' ).text() );

            // compare price with list
            $ranges.forEach( function( $range ) {
               if( $finalPrice >= $range['min'] && $finalPrice <= $range['max'] ) {
                   fs.appendFile( $fileName, "\n" + '<div id="price_range">' + $range[1] + '_' + $range[2] + '</div>', function( $err ) {
                      if( $err ) throw $err;
                    });
               }
            } );
        });
    } );
});
