process.stdin.setEncoding('utf8');

process.stdin.on('data', function (stringFromUser){
    let reversedString;
    reversedString = stringFromUser.split('').reverse().join('');
    process.stdout.write(reversedString + '\n\n');
});




