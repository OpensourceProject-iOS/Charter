const expect = require('expect.js');
const messageParser = require('./message-parser');
const fs = require('fs');
const path = require('path');

const getTestFile = (name, callback) => {
  fs.readFile(path.join(__dirname, 'sample', name), 'utf8', callback);
};

describe('message-parser', () => {
  it('should parse Message-1 into an object with the correct fields', (done) => {
     getTestFile('Message-1', function(err, message) {

      messageParser(message, (err, actual) => {
        const expected = {
          from: 'jon889 at me.com (Jonathan Bailey)',
          date: 'Mon, 25 Jan 2016 15:54:37 +0000',
          subject: '[swift-users] try? with a function that returns an optional',
          inReplyTo: 'CAMA6uOAhMv1SAPRe=KcD15kYTmJjNNnDWtG+zBVJbXswNLMZGw@mail.gmail.com',
          references: ['2FA36C98-FBCA-4F27-9706-77DF38BF747C@me.com', 'CAMA6uOAhMv1SAPRe=KcD15kYTmJjNNnDWtG+zBVJbXswNLMZGw@mail.gmail.com'],
          messageID: 'A52D5CCD-E51B-488F-B915-8795231FFEB9@me.com'
        };

        expected.content = "So it would be legal to change the type of y in the second example to `Int??`\n\nDoes that mean when assigning optionals, it will unwrap, check if it\'s nill and assign nil, else assign the original value? This seems kind of pointless to just assigning the complete optional\n\n\n> On 25 Jan 2016, at 15:49, Svein Halvor Halvorsen <svein.h at lvor.halvorsen.cc> wrote:\n>\n> This is exactly according to the documentation.\n> In your first example `someThrowingFunction` returns an `Int`, so `y` is defined as an `Int?`.\n> In the second example `someThrowingFunction` returns an `Int?`, so `y` should be an `Int??`\n>\n> However, since you didn\'t update the definition of `y` in your second example, the if branch either assigns an `Int?` to an `Int?`, which is legal, and may be nil, or it explicitly sets it to nil, which is also legal. Thus, effectively unwrapping the nested optionals.\n>\n> Yu could also apply a `flatMap` to the nested optional, like so:\n>\n> let x = (try? someThrowingFunction())?.flatMap({$0})\n>\n> I\'m not sure if it\'s more readable, though.\n>\n>\n> 2016-01-25 14:01 GMT+01:00 Jonathan Bailey via swift-users <swift-users at swift.org>:\n>> In the language guide on the apple website, https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html#//apple_ref/doc/uid/TP40014097-CH42-ID542\n>>\n>> It says the following assignments to x and y are equivalent:\n>> func someThrowingFunction() throws -> Int { ... }\n>> let x = try? someThrowingFunction()\n>> // x has type `Int?`\n>>\n>> let y: Int?\n>> do {\n>>     y = try someThrowingFunction()\n>> } catch {\n>>     y = nil\n>> }\n>>\n>> However this isn’t the case if someThrowingFunction also returns an optional, say:\n>>\n>> func someThrowingFunction() throws -> Int? { ... }\n>>\n>> The type of x would be `Int??`, but the type of y is still `Int?`, is there some way to make the `try?` return an `Int?` instead of a double optional, which is not very helpful.\n>>\n>> Thanks,\n>> Jonathan\n>>\n>>\n>> _______________________________________________\n>> swift-users mailing list\n>> swift-users at swift.org\n>> https://lists.swift.org/mailman/listinfo/swift-users\n>>\n>";

        expect(actual).to.eql(expected);
        done();
      });
    });
  });

  it('should parse Message-2 into an object with the correct fields', (done) => {
    getTestFile('Message-2', (err, message) => {
      messageParser(message, (err, actual) => {
        const expected = {
          from: 'tseitz42 at icloud.com (Thorsten Seitz)',
          date: 'Wed, 03 Feb 2016 07:35:29 +0100',
          subject: '[swift-evolution] Proposal: Pattern Matching Partial Function (#111)',
          inReplyTo: '5BF00F78-C732-416E-A1F5-C8F1858886B3@novafore.com',
          references: ['5BF00F78-C732-416E-A1F5-C8F1858886B3@novafore.com'],
          messageID: 'AF417EF0-DAD2-408D-BDC3-334C88B88083@icloud.com'
        };

        delete actual.content;

        expect(actual).to.eql(expected);
        done();
      });
    })
  });

  it('should parse Message-3 into an object with the correct fields', (done) => {
    getTestFile('Message-3', (err, message) => {
      messageParser(message, (err, actual) => {
        const expected = {
          from: 'jgroff at apple.com (Joe Groff)',
          date: 'Tue, 08 Dec 2015 09:54:45 -0800',
          subject: '[swift-evolution] isEqual to replace == Equatable Requirement',
          inReplyTo: 'CAKK64=ggLQwCsSBH9MBzoQ5KJP=Vbgs0yNV6EazDJ0h6WByO5Q@mail.gmail.com',
          messageID: '15F13AFD-9D2F-4C73-996F-368C937532E3@apple.com',
          references: ['CAKK64=ggLQwCsSBH9MBzoQ5KJP=Vbgs0yNV6EazDJ0h6WByO5Q@mail.gmail.com']
        };

        delete actual.content;

        expect(actual).to.eql(expected);
        done();
      });
    })
  });

  it('should parse Message-4 into an object with the correct fields', (done) => {
    getTestFile('Message-4', (err, message) => {
      messageParser(message, (err, actual) => {
        const expected = {
          from: 'jgroff at apple.com (Joe Groff)',
          date: 'Tue, 23 Feb 2016 12:09:25 -0800',
          subject: '[swift-users] libswift frontend ios',
          inReplyTo: 'CA+mxoxcfbFFAGU1ocL9cbQWQwbK6dt5c5bxK7Jp8mRkifDcpvw@mail.gmail.com',
          messageID: '55571741-5D3D-4EEE-ABA5-D2FF5E305C08@apple.com',
          references: ['CA+mxoxf5wDk0rQK1dPjC9QO+EZrzvwO8k2qufsCufes83BtjVw@mail.gmail.com', 'B034287A-A96B-4C3C-814F-3B9D8AD9AE36@apple.com', 'CA+mxoxeXL7if7iJZ7BMxychZh+pYBhM=XxyKq3HonZi+ng0pqA@mail.gmail.com', '948BA6D0-08DC-4DD0-9BA7-3CEBBBD02735@apple.com', 'CA+mxoxcfbFFAGU1ocL9cbQWQwbK6dt5c5bxK7Jp8mRkifDcpvw@mail.gmail.com']
        };

        expected.content = `\n> On Feb 23, 2016, at 12:06 PM, Ramakrishna Mallireddy <ramakrishna.malli at gmail.com> wrote:\n> \n> While trying to build for iOS, I am stuck here...I am using the build-script to compile, iOS simulator builds are done and for arm all libs are generate except libSwiftIRGen.a, libSwiftSILOptimizer & libSwiftImmediate.a\n> \n> swift/swift/lib/Immediate/REPL.cpp:39:10: fatal error: 'histedit.h' file not found\n> \n> #include <histedit.h>\n> \n> this file is not there for iOS, how to get around this.\n> \n\nlibedit probably isn't available on iOS, but it's only used by the compiler-debugging REPL. You can refine the #if here to exclude it from iOS builds:\n\n#if defined(__APPLE__) || defined(__FreeBSD__)\n// FIXME: Support REPL on non-Apple platforms. Ubuntu 14.10's editline does not\n// include the wide character entry points needed by the REPL yet.\n#include <histedit.h>\n#endif // __APPLE__\n\nInstead of defined(__APPLE__), defined(__MACOSX__) is probably more appropriate.\n\n-Joe`;

        expect(actual).to.eql(expected);
        done();
      });
    })
  });
});