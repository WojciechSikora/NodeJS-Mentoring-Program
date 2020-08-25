process.stdin.setEncoding('utf8');

process.stdin.on('data', function (stringFromUser){
    const reversedString = stringFromUser.split('').reverse().join('');
    process.stdout.write(reversedString + '\n\n');
});
